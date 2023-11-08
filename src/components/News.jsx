// import React, { useState } from 'react'
// import {Select,Typography,Row,Col,Avatar,Card} from 'antd';
// import moment from 'moment/moment';
// import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
// import { useGetCryptosQuery } from '../services/cryptoApi';

// const {Text,Title} = Typography;
// const {Option} = Select;

// const News = ({simplified}) => {

//   const [newsCategory,setNewsCategory] = useState('Cryptocurrency')

//   const {data} = useGetCryptosQuery(100);
//   const {data:cryptoNews} = useGetCryptoNewsQuery({newsCategory,count:simplified?6:12})
//   console.log(cryptoNews);

//   if(!cryptoNews?.value) return 'Loading...';


//   return (
    
//     <Row gutter={[24,24]}>
//       {
//         !simplified&&(
//           <Col span={24}>
//             <Select
//                 showSearch
//                 className='select-news'
//                 placeholder='Select a Crypto'
//                 optionFilterProp='children'
//                 onChange={(value)=> setNewsCategory(value)}
//                 filterOption={(input,option)=> option.children.toLowerCase().indexOf(input.toLowerCase())>= 0}
//             >
//             <Option value='Cryptocurrency'>Cryptocurrency</Option>
//             {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}

//             </Select>
//           </Col>
//         )
//       }
//       {
//         cryptoNews.value.map((news,i)=>(
//           <Col xs={24} sm={12} lg={8} key={i}>
//               <Card hoverable className='news-card'>
//                 <a href={news.url} target='_blank' rel="noreferrer">
//                   <div className='news-image-container'>
//                     <Title className='news-title' level={4}>{news.name}</Title>
//                     <img style={{maxWidth:'200px',maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl}/>
//                   </div>
//                   <p>
//                     {news.description>100?`${news.description.substring(0,100)}...`:news.description}
//                   </p>
//                   <div>
//                     <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
//                   </div>
//                 </a>
//               </Card>
//           </Col>
//         ))
//       }
//     </Row>
//   )
// }

// export default News

import {React, useEffect ,useState} from 'react'
import {Select,Typography,Row,Col,Avatar,Card} from 'antd';
import moment from 'moment/moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import alanBtn from "@alan-ai/alan-sdk-web";

const alanKey ='b94de75530c3cabb13cdd92a2660cf152e956eca572e1d8b807a3e2338fdd0dc/stage';



const {Text,Title} = Typography;
const {Option} = Select;

const News = ({simplified}) => {

  useEffect(() => {
    alanBtn({
      key:alanKey,
      onCommand:({command,articles}) =>{
        if(command === 'newHeadings'){
          console.log(articles);
        }
      }
    })
  },[])
  const [newsCategory,setNewsCategory] = useState('Cryptocurrency')

  const {data} = useGetCryptosQuery(100);
  const {data:cryptoNews} = useGetCryptoNewsQuery({newsCategory,count:simplified?6:12})
  console.log(cryptoNews);

  if(!cryptoNews?.value) return 'Loading...';


  return (
    
    <Row gutter={[24,24]}>
      {
        !simplified&&(
          <Col span={24}>
            <Select
                showSearch
                className='select-news'
                placeholder='Select a Crypto'
                optionFilterProp='children'
                onChange={(value)=> setNewsCategory(value)}
                filterOption={(input,option)=> option.children.toLowerCase().indexOf(input.toLowerCase())>= 0}
            >
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}

            </Select>
          </Col>
        )
      }
      {
        cryptoNews.value.map((news,i)=>(
          <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className='news-card'>
                <a href={news.url} target='_blank' rel="noreferrer">
                  <div className='news-image-container'>
                    <Title className='news-title' level={4}>{news.name}</Title>
                    <img style={{maxWidth:'200px',maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl}/>
                  </div>
                  <p>
                    {news.description>100?`${news.description.substring(0,100)}...`:news.description}
                  </p>
                  <div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
              </Card>
          </Col>
        ))
      }
    </Row>
  )
}

export default News