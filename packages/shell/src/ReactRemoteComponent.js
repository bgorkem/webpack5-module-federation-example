import React from 'react';

/**
 * Custom hook to add javascript tag to load on page..
 * @param {string} url
 */
const useDynamicScriptLoader = (url) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }
    const element = document.createElement('script');
    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      console.log('loaded script');
      setReady(true);
    };

    element.onerror = () => {
      console.error('script load failed');
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log('removing the script');
      setFailed(false);
      setReady(false);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

export default ({ url, scope, module, ...props }) => {
  // this will rerender once the script is loaded / failed
  const { ready, failed } = useDynamicScriptLoader(url);

  console.log('React Remote Compponent rendering script ready: ', ready);

  if (failed) {
    return <div>useDynamicScriptLoader: Failed loading component</div>;
  }

  if (!ready) {
    return <div>useDynamicScriptLoader: Loading component</div>;
  }

  const Wrapped = React.lazy(
    async () =>
      await window[scope].get(module).then((factory) => {
        const Module = factory();
        console.log('Module', Module);
        return Module;
      })
  );

  return (
    <React.Suspense fallback={<div>React Suspense ... Loading</div>}>
      <div>
        <Wrapped {...props} />
      </div>
    </React.Suspense>
  );
};
