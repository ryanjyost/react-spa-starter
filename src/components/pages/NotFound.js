import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { RouteMap } from '../../routes';

export default function NotFound() {
   return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
