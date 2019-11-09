import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { RouteMap } from '../../routes';

export default function ErrorPage() {
   return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
