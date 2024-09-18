# WeChat Mini Program Online Shop

This repository contains the source code for an online shop mini program developed for the WeChat platform. The mini program allows users to browse and purchase products through a user-friendly interface within the WeChat ecosystem.

## Technologies Used

- **WXML (WeiXin Markup Language)**: For structuring the user interface
- **WXSS (WeiXin Style Sheets)**: For styling the components
- **JavaScript**: For implementing the business logic and interactivity
- **WeChat Cloud Development**: For storing photos and other data

## Features

- Product browsing
- Shopping cart functionality
- User authentication
- Order placement
- Image and data storage using WeChat Cloud

## Prerequisites

To work with this project, you'll need:

- [WeChat Developer Tools](https://developers.weixin.qq.com/miniprogram/en/dev/devtools/download.html)
- A WeChat Developer account
- Basic knowledge of WXML, WXSS, and JavaScript

## Setup

1. Clone this repository
2. Open the project in WeChat Developer Tools
3. Configure your WeChat Cloud environment
4. Run and test the mini program in the simulator

## Project Structure

```
├── .eslintrc.js
├── .gitignore
├── app.js
├── app.json
├── app.wxss
├── cloud/
│   └── shop_get_openid/
│       ├── config.json
│       ├── index.js
│       └── package.json
├── env.js
├── images/
│   └── [various image files]
├── order/
│   ├── order.js
│   ├── order.json
│   ├── order.wxml
│   └── order.wxss
├── pages/
│   ├── cart/
│   ├── goodDetail/
│   ├── index/
│   │   ├── bannerDetail/
│   │   ├── search/
│   │   └── typeDetail/
│   ├── me/
│   │   └── myOrder/
│   ├── order/
│   └── type/
├── project.config.json
├── project.private.config.json
├── sitemap.json
└── utils/
    └── util.js
```

## Main Components

- **pages**: Contains the main pages of the mini program (index, cart, product details, user profile, etc.)
- **cloud**: Includes cloud functions for WeChat Cloud Development
- **images**: Stores static images used in the app
- **utils**: Contains utility functions
- **order**: Handles order-related functionality

## Configuration Files

- **app.js**: Main application file
- **app.json**: Global configuration
- **app.wxss**: Global styles
- **project.config.json**: Project configuration
- **env.js**: Environment variables

