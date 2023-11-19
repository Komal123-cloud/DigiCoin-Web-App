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











// import {React, useEffect ,useState} from 'react'
// import {Select,Typography,Row,Col,Avatar,Card} from 'antd';
// import moment from 'moment/moment';
// import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
// import { useGetCryptosQuery } from '../services/cryptoApi';
// import alanBtn from "@alan-ai/alan-sdk-web";

// //const alanKey ='b94de75530c3cabb13cdd92a2660cf152e956eca572e1d8b807a3e2338fdd0dc/stage';
// const alanKey='85559d773faa7bba3157162cf75a8b152e956eca572e1d8b807a3e2338fdd0dc/stage';



// const {Text,Title} = Typography;
// const {Option} = Select;

// const News = ({simplified}) => {

//   useEffect(() => {
//     alanBtn({
//       key:alanKey,
//       onCommand:({command,articles}) =>{
//         if(command === 'newHeadings'){
//           console.log(articles);
//         }
//       }
//     })
//   },[])
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








import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import Modal from './Modal/Modal';
import NewsCards from './NewsCards/NewsCards';
import useStyles from '../styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: '85559d773faa7bba3157162cf75a8b152e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          {/* <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/adrian-hajdin/"> Adrian Hajdin</a> -
            <a className={classes.link} href="http://youtube.com/javascriptmastery"> JavaScript Mastery</a>
          </Typography> */}
    
        </div>
      ) : null}
    </div>
  );
};

export default App;