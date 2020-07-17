
import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name:string, param:any | null) {
  navigationRef.current?.navigate(name,param);
}