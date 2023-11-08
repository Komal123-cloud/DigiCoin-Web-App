import React from 'react'
import {Button,Menu,Typography,Avatar} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined,MoneyCollectOutlined,BulbOutlined,FundOutlined,MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png'

const Navbar = () => {
  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size="medium"/>
            <Typography.Title level={3} className='logo'>
                <Link to="/home">DigiCoin</Link>
            </Typography.Title>   
        </div> 
        
        
          <Menu theme='dark' mode="horizontal"
           style={{ flex: "auto", minWidth: 0 }}>
                  <Menu.Item icon={<HomeOutlined/>}>
                    <Link to="/home"> Home</Link>
                  </Menu.Item>
                  <Menu.Item icon={<FundOutlined/>}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                  </Menu.Item>
                  <Menu.Item icon={<MoneyCollectOutlined/>}>
                    <Link to="/coinstable">Exchanges</Link>
                  </Menu.Item>
                  <Menu.Item icon={<BulbOutlined/>}>
                    <Link to="/news">News</Link>
                  </Menu.Item>
          </Menu>
        
        
    </div>
  )
}

export default Navbar