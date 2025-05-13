import config from '../config'; 

function Login() {
  const authUrl =
    `${config.domain}/login?` +
    `response_type=token&` +
    `client_id=${config.clientId}&` +
    `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
    `scope=openid+aws.cognito.signin.user.admin+email+profile`;

  window.location.href = authUrl;
}

export default Login;