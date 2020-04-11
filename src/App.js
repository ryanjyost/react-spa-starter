import React, { useState, useEffect } from 'react';
import { useGlobalEvent, useLocalStorage } from 'beautiful-react-hooks';
import shuffle from 'shuffle-array';
import SwipeableViews from 'react-swipeable-views';
import { Button, Typography } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, LinkOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { isBrowser } from 'react-device-detect';

const { Title, Text } = Typography;

const baseUrl = 'https://birdseyenews.s3.us-east-2.amazonaws.com/current/';

export default function App() {
   const [allSites, setSites] = useState([]);
   const [currentSiteIndex, setCurrentSiteIndex] = useState(3);
   const [menuOpen, setMenuOpen] = useLocalStorage('menuOpen', true);
   const onKeyPress = useGlobalEvent('keydown');

   useEffect(() => {
      setSites(shuffle(sites)); // eslint-disable-line
   }, []);

   function handleSiteChange(key) {
      function getNewIndex(key) {
         const lowIndex = 0;
         const highIndex = allSites.length - 1;
         let indexDiff = 0;

         if (key === 'ArrowLeft') {
            indexDiff = -1;

            if (currentSiteIndex === lowIndex) {
               return highIndex;
            }

            return currentSiteIndex + indexDiff;
         }
         if (key === 'ArrowRight') {
            indexDiff = 1;

            if (currentSiteIndex === highIndex) {
               return lowIndex;
            }
         }

         return currentSiteIndex + indexDiff;
      }

      if (!key) return currentSiteIndex;

      setCurrentSiteIndex(getNewIndex(key));
   }

   onKeyPress(e => {
      handleSiteChange(e.key);
   });

   const currentSite = allSites[currentSiteIndex];
   console.log(currentSite);

   if (!currentSite || !allSites.length) return null;

   return (
      <div
         style={{
            height: '100vh',
            overflow: menuOpen ? 'hidden' : 'auto',
            fontFamily: 'sans-serif',
            backgroundColor: 'rgba(0,0,0,0.02)'
         }}>
         <div
            style={{
               position: 'fixed',
               top: 10,
               left: 0,
               zIndex: 1000,
               width: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between'
            }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               {menuOpen ? (
                  <div
                     style={{
                        backgroundColor: '#59CFA6',
                        width: 44,
                        height: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        margin: '0px 20px'
                     }}>
                     <img style={{ width: 30 }} src="birdseyenews.png" />
                  </div>
               ) : (
                  <Button
                     // type="ghost"
                     shape="pill"
                     href="mailto:ryanjyost@gmail.com?subject=Bird's Eye News Feedback"
                     style={{
                        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                        margin: '0px 20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)'
                     }}>
                     <strong>Give Feedback</strong>
                  </Button>
               )}
               {/*<Title level={4} style={{ color: '#fff', margin: 0, marginLeft: 10, fontWeight: 'normal' }}>*/}
               {/*   Bird's Eye News*/}
               {/*</Title>*/}
            </div>
            <Button
               type="ghost"
               shape="circle"
               size="large"
               onClick={() => setMenuOpen(!menuOpen)}
               icon={menuOpen ? <CloseOutlined /> : <MenuOutlined />}
               style={{
                  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                  margin: '0px 20px',
                  paddingTop: 6,
                  height: 40,
                  width: 40,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
               }}
            />
         </div>

         {menuOpen && (
            <div
               onClick={() => setMenuOpen(false)}
               style={{
                  position: 'absolute',
                  height: '100vh',
                  width: '100%',
                  zIndex: 101,
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  paddingTop: 100
               }}>
               <div
                  style={{
                     color: '#fff',
                     padding: 20,
                     width: '100%',
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     justifyContent: 'center'
                  }}>
                  <Title level={2} style={{ color: '#fff', margin: 0, marginLeft: 10, fontWeight: 'strong' }}>
                     Bird's Eye News
                  </Title>
                  <Title
                     level={4}
                     style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        margin: 0,
                        marginLeft: 10,
                        marginTop: 10,
                        fontWeight: 'normal'
                     }}>
                     Fly above the bulls***
                  </Title>

                  <Title level={4} style={{ color: '#fff', marginTop: 100, textAlign: 'center' }}>
                     {isBrowser ? 'Use arrow keys to flip through news sites' : 'Swipe to flip through news sites'}
                  </Title>
                  <Title level={1} style={{ color: '#fff', marginTop: 0, textAlign: 'center' }}>
                     <span>&larr; &rarr;</span>
                  </Title>

                  <Text style={{ color: '#fff', marginTop: 100, textAlign: 'center' }}>
                     Contact <a style={{color: '#fff', textDecoration:'underline'}} href="mailto:ryanjyost@gmail.com?subject=Bird's Eye News">ryanjyost@gmail.com</a> with<br/>
                     questions, comments, concerns, good movie recs, etc.
                  </Text>
               </div>
            </div>
         )}

         {!menuOpen && (
            <div
               style={{
                  width: '100%',
                  margin: 'auto',
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  zIndex: 100,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  padding: '6px 0px',
                  height: 50
               }}>
               <Button
                  type="ghost"
                  onClick={() => handleSiteChange('ArrowLeft')}
                  icon={<ArrowLeftOutlined style={{ color: '#fff' }} />}
                  style={{
                     // boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                     width: 100,
                     margin: '0px 20px'
                     // backgroundColor: '#fff'
                  }}
               />
               <Button
                  type="primary"
                  icon={<LinkOutlined />}
                  shape="circle"
                  size="large"
                  href={currentSite.url}
                  style={{
                     boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                     width: 40,
                     height: 40,
                     margin: '0px 20px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center'
                  }}
               />
               <Button
                  type="ghost"
                  onClick={() => handleSiteChange('ArrowRight')}
                  icon={<ArrowRightOutlined style={{ color: '#fff' }} />}
                  style={{
                     // boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                     width: 100,
                     margin: '0px 20px'
                     // backgroundColor: '#fff'
                  }}
               />
            </div>
         )}
         <SwipeableViews index={currentSiteIndex} onChangeIndex={index => setCurrentSiteIndex(index)}>
            {allSites.map(site => {
               return (
                  <div
                     key={site.name}
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        position: 'relative',
                        height: '100%',
                        overflow: menuOpen ? 'hidden' : 'auto',
                        paddingBottom: 55
                     }}>
                     <img style={{ width: '100%', maxWidth: 1024 }} src={`${baseUrl}${site.name}.jpeg`} />
                  </div>
               );
            })}
         </SwipeableViews>
      </div>
   );
}
