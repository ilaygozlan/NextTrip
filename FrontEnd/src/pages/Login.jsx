import config from '../config'; 

function Login() {
  const authUrl =
    `${config.domain}/login?` +
    `response_type=code&` +
    `client_id=${config.clientId}&` +
    `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
    `scope=openid+aws.cognito.signin.user.admin+email+profile`;

  window.location.href = authUrl;
  console.log(authUrl)
}

export default Login;