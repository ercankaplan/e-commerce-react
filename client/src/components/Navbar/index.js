import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Image, Menu, MenuButton, MenuItem, MenuList, Wrap, WrapItem } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'
import styles from './styles.module.css';
import { useAuth } from '../../contexts/AuthContext'
import { HamburgerIcon } from '@chakra-ui/icons';
import { useBasket } from '../../contexts/BasketContext';

function Navbar() {

    const { loggedIn, user, logout } = useAuth();
    const navigate = useNavigate();
    const { items } = useBasket();

    const handleLogout = async () => {

        console.log("logout");
        logout(() => {
            navigate('/');
        });

    }
    //console.log("loggedIn",loggedIn);

    return (
        <nav className={styles.nav}>

            <div className={styles.left}>
                <div className={styles.logo}>
                    <Link to="/">
                        <Image className={styles.icon} src='https://www.headspace.com/static/images/logo.svg' ></Image>
                    </Link>
                </div>
                <ul className={styles.menu}>
                    <li>
                        <Link to="/">Products</Link>

                    </li>
                </ul>
            </div>
            <div className={styles.right}>
                <>
                    <Wrap spacing={2}>
                        {
                            !loggedIn && (<>

                                <WrapItem>
                                    <Link to="/signin">
                                        <Button colorScheme='blue' size='sm'>Login</Button>
                                    </Link>
                                </WrapItem>
                                <WrapItem>
                                    <Link to="/signup">
                                        <Button colorScheme='green' size='sm'>Register</Button>
                                    </Link>
                                </WrapItem>

                            </>
                            )
                        }

                        {
                            loggedIn && (<>

                                <WrapItem>
                                    <Link to="/profile">
                                        <Avatar name={user.email} src='https://bit.ly/dan-abramov' />
                                        {/* <Button colorScheme='blue' size='sm'>Profile</Button> */}
                                    </Link>
                                </WrapItem>
                                <WrapItem>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<HamburgerIcon />}>

                                        </MenuButton>
                                        <MenuList>

                                            <Link to="/profile"><MenuItem>  Profile  </MenuItem></Link>
                                            <Link><MenuItem onClick={handleLogout}>Logout</MenuItem> </Link>
                                            <Link to="/myorders"><MenuItem>  My Orders  </MenuItem></Link>
                                        </MenuList>
                                    </Menu>
                                </WrapItem>

                            </>
                            )
                        }
                        <WrapItem alignContent="center">
                            {

                                items.length > 0 && (

                                    <Link to="/basket">
                                         <Button colorScheme='orange' size='sm'>Basket ({items.length})</Button>
                                    </Link>
                                )
                            }
                        </WrapItem>

                    </Wrap>
                </>
            </div>
        </nav>
    )
}

export default Navbar