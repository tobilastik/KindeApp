import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function LoggedIn() {
  const { user, logout, getToken } = useKindeAuth();

  const handlePressButton = async () => {
    const accessToken = await getToken()

    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    fetch(`${process.env.VITE_KINDE_DOMAIN}api/v1/organizations`,
      {
        method: 'GET',
        headers: headers
      })
      .then(function (res) {
        return res.json();
      }).then(function (body) {
        console.log(body);
      });

  };

  return (
    <>
      <header>
        <nav className="nav container">
          <h1 className="text-display-3">KindeAuth</h1>
          <div className="profile-blob">
            {user.picture !== "" ? (
              <img
                className="avatar"
                src={user.picture}
                alt="user profile avatar"
              />
            ) : (
              <div className="avatar">
                {user?.given_name?.[0]}
                {user?.family_name?.[1]}
              </div>
            )}
            <div>
              <p className="text-heading-2">
                {user?.given_name} {user?.family_name}
              </p>
              <button className="text-subtle" onClick={logout}>
                Sign out
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="container">
          <div className="card start-hero">
            <p className="text-body-2 start-hero-intro">Woohoo!</p>
            <p className="text-display-2">
              Your authentication is all sorted.
              <br />
              Build the important stuff.
            </p>
          </div>
          <section className="next-steps-section">
            <button className="btn btn-light btn-big" onClick={handlePressButton} >
              Get Organizations
            </button>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <strong className="text-heading-2">KindeAuth</strong>
          <p className="footer-tagline text-body-3">
            Visit our{" "}
            <a className="link" href="https://kinde.com/docs">
              help center
            </a>
          </p>

          <small className="text-subtle">
            © 2023 KindeAuth, Inc. All rights reserved
          </small>
        </div>
      </footer>
    </>
  );
}

