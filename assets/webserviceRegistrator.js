if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }