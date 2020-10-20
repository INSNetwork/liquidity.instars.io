import React, { useEffect, useState } from 'react'
import { request } from 'graphql-request'
import { useViewport } from 'use-viewport'
import StakeModule from 'components/StakeModule/StakeModule'
import Header from 'components/RibbonModule/Header'

const GQL_ENDPOINT = `${process.env.WEBSITE_BACKEND_URL}/graphql`

export default () => {
  const { below } = useViewport()
  const [socials, setSocials] = useState([])
  const [isCompact, setIsCompact] = useState(false)
  const smallLayout = below(415)
  useEffect(() => {
    setTimeout(() => {
      setIsCompact(smallLayout)
    }, 0)
  }, [smallLayout])

  useEffect(() => {

    async function fetchSocials() {
      let response
      try {
        response = await request(
          GQL_ENDPOINT,
          `
              query SocialTypes {
                socialTypes {
                   name
                   icon {
                     url
                   }
                   socials {
                     title
                     url
                   }
                }
              }
          `
        )

        if (!response.socialTypes) {
          throw new Error('Wrong response')
        }

        setSocials(response.socialTypes.filter((item) => item.socials.length))
      } catch (err) {
        console.error('An error has occurred')
      }
    }

    fetchSocials()
  }, [])

  return (
    <div>
      <Header socials={socials} />
      <div
        css={`
          position: relative;
          min-height: 800px;
          padding: 6em 0;
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        `}
      >
        <StakeModule />
      </div>
    </div>
  )
}
