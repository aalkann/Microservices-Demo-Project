import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8181/',
    realm: 'spring-microservices-security-realm',
    clientId: 'react-client',
    KeycloakResponseType: 'code',
    responseMode: 'query', 
});

const initializeKeycloak = async () => {
    try {
      const authenticated = await keycloak.init({
        onLoad: 'check-sso', // Check if already logged in without forcing login
        checkLoginIframe: false, // Disables login iframe checking
        pkceMethod: 'S256',
        flow: 'standard', // Standard OAuth flow
      });
  
      if (!authenticated) {
        // window.location.reload(); // Forces reload if not authenticated
      } else {
        console.info('Authenticated');
        keycloak.onTokenExpired = () => {
          console.log('Token expired');
          keycloak.logout();
        };
      }
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };


  export { keycloak, initializeKeycloak };
