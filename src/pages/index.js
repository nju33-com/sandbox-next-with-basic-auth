const USER_PASS = 'nju33:secret';

const Page = ({message}) => <div>{message}</div>;

const sendUnauthorized = res => {
  res.writeHead(401, {
    'www-authenticate': 'Basic realm=secret string'
  });
  res.end();
};

Page.getInitialProps = ({req, res}) => {
  if (!process.browser) {
    const authorization = req.headers['authorization'];

    if (typeof authorization === 'undefined') {
      sendUnauthorized(res);
      return;
    }

    const matches = authorization.match(/[^\s]+$/);
    if (matches === null) {
      sendUnauthorized(res);
      return;
    }

    const userPass = Buffer.from(
      matches[0],
      'base64'
    ).toString();

    if (userPass !== USER_PASS) {
      sendUnauthorized(res);
      return;
    }
  }

  return {message: 'foo'};
};

export default Page;
