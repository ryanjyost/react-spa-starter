import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { RouteMap } from 'Routes';
import style from './errorPage.module.scss';

/**
 * Page to show instead of page component if error caught
 */
export default function ErrorPage() {
   return (
      <div className={style.container}>
         <Result
            status="500"
            title="500"
            subTitle="An unknown error occurred."
            extra={
               <Link to={RouteMap.ROOT}>
                  <Button type="primary">Back Home</Button>
               </Link>
            }
         />
      </div>
   );
}
