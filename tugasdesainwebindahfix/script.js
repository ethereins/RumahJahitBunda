let deferredPrompt;
const installButton = document.getElementById('installButton');

if (installButton) {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.style.display = 'block';

        installButton.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            });
        });
    });
}

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scroll ke bawah
            navbar.style.top = "-80px"; // Menyembunyikan navbar (sesuaikan dengan tinggi navbar)
        } else {
            // Scroll ke atas
            navbar.style.top = "0";
        }
        lastScrollTop = scrollTop;
    });
}
