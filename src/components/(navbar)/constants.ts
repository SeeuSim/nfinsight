interface INavbarLinks {
  authenticated: Array<INavbarLink>,
  unauthenticated: Array<INavbarLink>,
  common: Array<INavbarLink>
}

interface INavbarLink {
  href: string;
  label: string;
  background?: string;
}

export const navConstants: INavbarLinks = {
  authenticated: [

  ],
  unauthenticated: [
    {
      label: "Login",
      href: "/auth/login",
      background: "bg-gray-100"
    },
    {
      label: "Sign Up",
      href: "/auth/signup",
      background: "bg-green-300"
    },
  ],
  common: [
    {
      label: "Analytics",
      href: "/analytics"
    },
    {
      label: "Account",
      href: "/account"
    },
  ]
}