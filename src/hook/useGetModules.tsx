import React from 'react';
import { Module } from '@/types/index';
import { ModuleList } from '@/types/modules';

export const GetModule = (data: Record<string, any>) => {
  // Ensure data exists and has content array
  if (!data || !Array.isArray(data.content)) {
    return <section className='noContent'>No content available.</section>;
  }

  const generateModule = (item: Module<any, any>, index: number) => {
    const key = `module${index}`;

    if (typeof ModuleList[item.module] !== 'undefined') {
      return React.createElement(ModuleList[item.module], {
        key,
        order: index,
        data: item,
      });
    }

    return React.createElement(
      () => <section className='noModule'>The Module {item.module} has not been created yet.</section>,
      { key }
    );
  };

  return data.content.map((item: Module<any, any>, index: number) => generateModule(item, index));
};
