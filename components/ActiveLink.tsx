import { usePathname } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren, useState, useEffect } from 'react'

type ActiveLinkProps = LinkProps & {
  className?: string
  activeClassName: string
}

const ActiveLink = ({
  children,
  activeClassName,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {

  const { href } = props;
  const pathName = usePathname();

  return (
    <Link className={pathName===href ? activeClassName : ""} {...props}>
    {children}
    </Link>
  )
}

export default ActiveLink