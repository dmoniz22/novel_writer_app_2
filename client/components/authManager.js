class AuthManager {
  constructor() {
    this.authButton = document.getElementById('auth-button');
    this.init();
  }

  init() {
    this.authButton.addEventListener('click', async () => {
      try {
        const { data, error } = await fetch('/api/auth', {
          method: 'POST',
          body: JSON.stringify({ provider: 'github' })
        });
        
        if (error) throw error;
        // Handle redirect to auth provider
      } catch (err) {
        console.error('Auth error:', err);
      }
    });
  }
}
