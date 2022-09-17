import React, { createContext, useState } from "react"

export interface UserInfo {
    id: number
    bio: string
    email: string
    photo: string
    name: string
    isRealtor: true
    creci: string
    stars: number
    comletedSells: number
    completedRents: number
    phone: string
    posts: any[]
  }
export let userInfo: UserInfo = {
    id: 11,
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, sunt illo nulla quam doloremque deleniti, mollitia iusto distinctio ipsa ullam eveniet, maiores minima quo quae obcaecati repudiandae enim aut tempora!',
    email: 'gustavo@gmail.com',
    photo: 'https://picsum.photos/seed/picsum/300',
    name: 'Gustavo',
    isRealtor: true,
    creci: '22394231',
    stars: 4.9,
    comletedSells: 12,
    completedRents: 10,
    phone: '479999-9999',
    posts: [
      {
        id: 1,
        title: 'casa no lago',
        description: 'Bela casa na beira do lago',
        totalArea: 800,
        usefulArea: 430,
        bathrooms: 5,
        bedrooms: 4,
        suites: 2,
        images: [
          {
            id: 2,
            link: 'https://picsum.photos/id/231/400',
          },
        ],
      },
      {
        id: 2,
        title: 'Casa na praia',
        description: 'Bela casa na praia',
        totalArea: 500,
        usefulArea: 330,
        bathrooms: 3,
        bedrooms: 4,
        suites: 2,
        images: [
          {
            id: 3,
            link: 'https://picsum.photos/id/22/400',
          },
        ],
      },
      {
        id: 3,
        title: 'Cobertura duplex',
        description: 'Bela cobertura duplex',
        totalArea: 450,
        usefulArea: 430,
        bathrooms: 4,
        bedrooms: 4,
        suites: 4,
        images: [
          {
            id: 4,
            link: 'https://picsum.photos/id/222/400',
          },
        ],
      },
      {
        id: 4,
        title: 'Apartamento',
        description: 'Bela apartamento com dois quartos',
        totalArea: 310,
        usefulArea: 300,
        bathrooms: 2,
        bedrooms: 2,
        suites: 1,
        images: [
          {
            id: 5,
            link: 'https://picsum.photos/id/234/400',
          },
        ],
      },
      {
        id: 5,
        title: 'Apartamento',
        description: 'Bela apartamento com dois quartos',
        totalArea: 310,
        usefulArea: 300,
        bathrooms: 2,
        bedrooms: 2,
        suites: 1,
        images: [
          {
            id: 6,
            link: 'https://picsum.photos/id/237/400',
          },
        ],
      },
    ],
  }

export type AuthContent = {
    user: UserInfo,
    setUser: (u: UserInfo) => void
}

export const AuthContext = createContext<AuthContent>({ user: userInfo, setUser: () => { } })

type Props = {
    children: JSX.Element,
}

const AuthProvider: React.FC<Props> = (props) => {
    const [user, setUser] = useState<UserInfo>(userInfo)

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider