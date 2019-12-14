import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { RouteMap } from 'Routes';
import style from './notFound.module.scss';

/**
 * Show this if route doesn't match anything
 */
export default function NotFound() {
   return (
      <div className={style.container}>
         <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
               <Link to={RouteMap.ROOT}>
                  <Button type="primary">Back Home</Button>
               </Link>
            }
         />
      </div>
   );
}
