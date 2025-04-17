# NextTrip - User-Based Travel Recommendation System 🌍

## 👥 Team
Group 2  
Adi Dagan – 318792579  
Ilay Gozlan – 318473295  
Ofri Gross – 322542820

## 🧭 What is NextTrip?
NextTrip is an innovative web-based platform designed to enhance the travel experience by helping users discover their next destination. The platform allows users to share personal experiences, rate countries they've visited, add tags, and share personalized travel tips. The system creates personalized recommendations based on the experiences and reviews of other travelers.

Additionally, NextTrip includes a business layer where local businesses such as restaurants, tour guides, and activity providers can present themselves. Users can rate these businesses to enrich the recommendation system with reliable and up-to-date information.

## 🚩 Problem Statement
Many travelers find it difficult to decide where to go next, especially when overwhelmed by the number of available destinations. Existing review platforms are not always personalized, and it’s often hard to find reviews that match a specific travel style.

## ✅ Our Solution
NextTrip provides personalized travel recommendations using a **collaborative filtering algorithm** that analyzes the preferences of similar users based on their ratings. The recommendation system also integrates user ratings of local businesses to enhance destination reliability and help users make more informed decisions.

## 🎯 Target Audience
- **Users**: Travel enthusiasts of all kinds, from solo adventurers to families looking for trusted suggestions and new destinations.
- **Business Stakeholders**: Investors and tourism-related app managers interested in smart, scalable digital solutions to improve global travel experiences.

## 🌟 Key Features
- Interactive world map where users mark countries they’ve visited
- Country rating form with score, tags, and personal travel tips
- Rating of local businesses in each country
- Display of top-rated businesses per location
- Recommendations for new countries based on user similarity and business satisfaction
- “My Trips” page with the ability to update past ratings
- Search by country name or tags (e.g., "Italian food")
- “Want to Visit” wishlist

## 🛠️ Tech Stack
- **Frontend**: React
- **Authentication**: Amazon Cognito
- **API Management**: Amazon API Gateway
- **Backend Logic**: AWS Lambda (Node.js or Python)
- **Database**: Amazon DynamoDB (NoSQL)
- **Storage & CDN**: Amazon S3 + CloudFront
- **Background Jobs**: Scheduled AWS Lambda for periodic recommendation engine updates

## 📁 Project Structure

