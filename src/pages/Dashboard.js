import React, { useEffect, useCallback } from 'react';
import styles from '../styles/pages/Dashboard.module.css';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '@n8n/chat/style.css'; // Import the styles
import { createChat } from '@n8n/chat'; // Import the createChat function
import { motion, useScroll, useTransform } from 'framer-motion';

const Dashboard = () => {
  const { user } = useOutletContext();

  const chatConfig = useCallback(() => ({
    webhookUrl: 'https://junedblr.app.n8n.cloud/webhook/d9c2dd74-7bea-495c-8bc6-aa3ca91d3bbe/chat',
    // ... other config options (target, mode, initialMessages, i18n, etc.)
  }), []);

  useEffect(() => {
    // This is where the n8n chat widget is initialized
    createChat(chatConfig());
  }, [chatConfig]);
// inside Dashboard component (after const Dashboard = () => { ... })
const { scrollY } = useScroll();

// Parallax vertical movement (stronger)
const yPos = useTransform(scrollY, [0, 800], [0, -250]);

// Rotation swings more dramatically
const rotate = useTransform(scrollY, [0, 800], [0, 30]);

// Scaling in and out (zoom effect)
const scale = useTransform(scrollY, [0, 800], [1, 1.3]);

// Fade in/out for cinematic feel
const opacity = useTransform(scrollY, [0, 300, 800], [1, 0.8, 1]);

// Horizontal sway (like floating left-right)
const xPos = useTransform(scrollY, [0, 400, 800], [0, -50, 50]);

  return (
    <>
      <Helmet>
        <title>Dashboard - JDChat</title>
      </Helmet>

      <div>
        <h2 className={styles.title}>Dashboard</h2>
        <p className={styles['welcome-text']}>
          Welcome, {user?.metadata?.firstName || 'stranger'}{' '}
          <span role="img" aria-label="waving hand">
            👋
          </span>
        </p>
        <p className={styles['welcome-subtext']}>
          We're glad to have you here.
        </p>
        <p className={styles['welcome-subtext']}>
  This is your AI-powered chatbot, always ready to assist you 24/7.
</p>
<p className={styles['welcome-subtext']}>
  Click the chat icon at the bottom right corner to start your conversation.
</p>

        {/* Animated image */}
        <div className={styles.imageContainer}>
          <motion.img
            src="/dashboard-illustration.png"
            alt="Dashboard illustration"
            className={styles.dashboardImage}
            style={{ y: yPos, rotate, scale, opacity, x: xPos }}
  transition={{ type: "spring", stiffness: 60, damping: 20 }}
/>
        </div>


        {/* This div is the target for the n8n chat widget */}
        <div id="n8n-chat"></div>

      </div>
    </>
  );
};

export default Dashboard;
