'use strict';

import React, {Component} from 'react';

import {
    AppRegistry
} from 'react-native';

import App from './app/src/android/app/app';
//import App from './app/src/android/app/login';
AppRegistry.registerComponent('rn', () => App);
