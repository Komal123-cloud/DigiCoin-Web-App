import React, { useEffect } from 'react'
import millify from 'millify'
import {Card, Row,Col, Input} from 'antd';
import { useState } from 'react';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';

const Cryptocurrencies = ({simplified}) => {

  const count = simplified? 10:100;

  const {data: cryptosList,isFetching} = useGetCryptosQuery(count);
  const [cryptos,setCryptos] = useState([]);
  const [searchTerm,setSearchTerm] = useState('');

  useEffect(()=>{
    
    const filterData = cryptosList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filterData);
  },[searchTerm])

  console.log(cryptos);
  if(isFetching) return 'Loading...';

  return (
    <div>
    {
      !simplified &&(
        <div>
          <Input placeholder='Search Cryptocurrency' onChange={(e)=> setSearchTerm(e.target.value)}
            style={{ width: '20%' }}
          />
        </div>
      )
    }
    
    <Row gutter={[32,32]} className='crypto-card-container'>
      {cryptos?.map((currency)=>(
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
          
              <Card
               title={`${currency.rank}.${currency.name}`}
               extra={<img className='crypto-image' src={currency.iconUrl}/>}
               hoverable>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p className={currency.change > 0 ? 'positive-change' : 'negative-change'}>
                  Daily Change: {millify(currency.change)}%
                </p>
              </Card>
          
        </Col>
      ))}
    </Row>
    </div>
  )
}

export default Cryptocurrencies