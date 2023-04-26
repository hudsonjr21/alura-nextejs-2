import { useRouter } from "next/router";
import { authService } from "./authService";
import React from "react";

export function withSession(funcao) {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        }
      };
      return funcao(modifiedCtx);
    } catch(err) {
      return {
        redirect: {
          permanent: false,
          destination: '/erro=401',
        }
      }
    }
  }
}


export function useSession() {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect (() => {
    authService.getSession()
      .then((userSession) => {
        console.log(userSession);
        setSession(userSession);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data: { 
      session,
    },
    loading,
    error,
  }
}

export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const session = useSession();
    const router = useRouter();
    
    if(!session.loading && session.error) {
      console.log('redireciona o usuário para a home');
      router.push('/?error=401')
    }

    const modifiedProps = {
      ...props,
      session: session.data.session,
    }

    return (
      <Component {...modifiedProps} />
    )
  }
}
