import React from 'react'
import styled from 'styled-components'
import instarslogo from 'components/Logo/logo-instars.svg'
import SocialLinks from 'components/SocialLinks/SocialLinks'
import './style.css'

function Footer({ socials }) {
  return (
    <div
      css={`
        padding: 6.5rem 0 4.25rem;
        background-color: #232026;

        @media (max-width: 920px) {
          padding: 4rem 0 2.75rem;
        }
      `}
    >
      <div className="container text-center">
        <div>
          <a href={`${process.env.WEBSITE_FRONTEND_URL}`}
             aria-label="Instars Logotype"
          >
            <img src={instarslogo}
                 alt="Instars Logotype Icon"
                 width={45}
                 css={`
                    @media (min-width: 640px) {
                      transform: scale(2.65);
                    }
                    @media (max-width: 920px) {
                      transform: scale(2);
                    }
                 `}
            />
          </a>
        </div>
        <FooterLinksBar />
        <SocialLinks
          socialTypes={socials}
          socialDropdownPlacement="top-start"
          socialDropdownPopoverStyles={`
            left: 16px !important;

            @media (min-width: 1700px) {
              min-width: 16rem !important;
            }
          `}
          socialLinksWrapperStyles={`
            justify-content: center;
            padding: 0.5rem 0 0;
          `}
        />
      </div>
    </div>
  )
}

function FooterLinksBar({}) {
  const links = [
    { path: '/terms', title: 'Terms of Use' },
    { path: '/documents/privacy-policy/recruitment-privacy-policy.pdf', title: 'Privacy Policy' },
    { path: '/contact-us', title: 'Contact us' },
  ];

  return (
    <div className="links-bar"
         css={`
            @media (min-width: 640px) {
               padding-top: 5rem;
            }
            @media (max-width: 920px) {
              padding-top: 2rem;
            }
         `}
    >
      {links.map((link, index) => {
        return <FooterBaseLink
          key={index}
          href={link.path ? `${process.env.WEBSITE_FRONTEND_URL}${link.path}` : ''}
        >
          {link.title}
        </FooterBaseLink>
      })}
    </div>
  )
}

const FooterBaseLink = styled.a`
  &,
  &:hover {
    font-size: 16px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    padding-left: 6px;
  }

  &:not(:last-child):after {
    content: '●';
    position: relative;
    top: -3px;
    left: -2px;
    font-size: 6px;
    padding-left: 8px;
  }

  @media (max-width: 920px) {
    &,
    &:hover {
      font-size: 12px;
      line-height: 20px;
  
      &:not(:last-child):after {
        top: -2.5px;
        font-size: 5px;
      }
    }
  }
`

export default Footer
