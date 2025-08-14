"use client";

import React from "react";
import { Spotlight } from "./aceternity/spotlight";
import { TextGenerateEffect } from "./aceternity/text-generate-effect";
import { HeroParallax } from "./aceternity/hero-parallax";
import { FloatingNav } from "./aceternity/floating-navbar";
import { BackgroundBeams } from "./aceternity/background-beams";
import { InfiniteMovingCards } from "./aceternity/infinite-moving-cards";
import { BentoGrid, BentoGridItem } from "./aceternity/bento-grid";
import { LampContainer } from "./aceternity/lamp";
import { Meteors } from "./aceternity/meteors";
import { HoverEffect } from "./aceternity/card-hover-effect";
import { AnimatedTooltip } from "./aceternity/animated-tooltip";
import { SparklesCore } from "./aceternity/sparkles";
import { Button } from "./aceternity/moving-border";
import { AuroraBackground } from "./aceternity/aurora-background";
import { GlowingStarsBackgroundCard, GlowingStarsDescription, GlowingStarsTitle } from "./aceternity/glowing-stars";
import { WavyBackground } from "./aceternity/wavy-background";
import { MacbookScroll } from "./aceternity/macbook-scroll";
import AnimatedTestimonialsDemo from "../animated-testimonials-demo";
import ExpandableCardDemo from "../expandable-card-demo-standard";
import GlobeDemo from "../globe-demo";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconHome,
  IconMessage,
  IconUser,
  IconCloudComputing,
  IconPalette,
  IconCode,
  IconRocket,
  IconShield,
  IconBolt,
  IconStar,
  IconSparkles
} from "@tabler/icons-react";

const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=300&fit=crop",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&h=300&fit=crop",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&h=300&fit=crop",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&h=300&fit=crop",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=300&fit=crop",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&h=300&fit=crop",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
  },
];

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take Arms against a Sea of troubles, and by opposing end them.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

const features = [
  {
    title: "Cloud Infrastructure",
    description: "Deploy your applications with enterprise-grade cloud infrastructure that scales automatically.",
    link: "#",
  },
  {
    title: "Modern Design System",
    description: "Beautiful, responsive components built with the latest design principles and accessibility in mind.",
    link: "#",
  },
  {
    title: "Developer Experience",
    description: "Optimized developer workflow with hot reload, TypeScript support, and comprehensive tooling.",
    link: "#",
  },
  {
    title: "Performance First",
    description: "Lightning-fast applications with optimized bundles, lazy loading, and advanced caching strategies.",
    link: "#",
  },
  {
    title: "Security Built-in",
    description: "Enterprise-grade security with authentication, authorization, and data protection out of the box.",
    link: "#",
  },
  {
    title: "Global Scale",
    description: "Deploy globally with CDN integration, edge computing, and multi-region support.",
    link: "#",
  },
];

const team = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2061&q=80",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
  },
];

// Peerlist logo
const Badge = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
        fill="#00AA45"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#219653"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
        fill="#24292E"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
        fill="white"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
        fill="#24292E"
      ></path>
    </svg>
  );
};

export function MacbookScrollDemo() {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F]">
      <MacbookScroll
        title={
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        }
        badge={
          <a href="https://peerlist.io/manuarora">
            <Badge className="h-10 w-10 -rotate-12 transform" />
          </a>
        }
        src={`https://ui.aceternity.com/linear.webp`}
        showGradient={false}
      />
    </div>
  );
}

export function BeautifulLanding() {
  return (
    <div className="w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative">
      <FloatingNav navItems={navItems} />

      {/* Hero Section with Spotlight */}
      <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Build Amazing <br /> Applications
          </h1>
          <TextGenerateEffect
            className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto"
            words="Create stunning web applications with modern technologies. From concept to deployment, we've got you covered."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/sign-up">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </motion.button>
            </Link>
            <Link href="/sign-in">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-neutral-600 text-neutral-300 font-semibold rounded-full hover:bg-neutral-800 transition-all duration-300"
              >
                Sign In
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Parallax Section */}
      <HeroParallax products={products} />

      {/* MacBook Scroll Section */}
      <MacbookScrollDemo />

      {/* Features Section with Background Beams */}
      <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
            Join the waitlist
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Welcome to MailJet, the best transactional email service on the web.
            We provide reliable, scalable, and customizable email solutions for
            your business. Whether you&apos;re sending order confirmations,
            password reset emails, or promotional campaigns, MailJet has got you
            covered.
          </p>
          <input
            type="text"
            placeholder="hi@manuarora.in"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 bg-neutral-950 placeholder:text-neutral-700 px-4 py-2"
          />
        </div>
        <BackgroundBeams />
      </div>

      {/* Features Grid with Hover Effects */}
      <div className="max-w-5xl mx-auto px-8 py-20">
        <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-4">
          Powerful Features
        </h2>
        <p className="text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
          Everything you need to build, deploy, and scale modern applications with confidence.
        </p>
        <HoverEffect items={features} />
      </div>

      {/* Bento Grid Section */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-16">
            Why Choose Us
          </h2>
          <BentoGrid className="max-w-4xl mx-auto">
            <BentoGridItem
              title="Lightning Fast Performance"
              description="Experience blazing fast load times with our optimized infrastructure and advanced caching strategies."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconBolt className="h-12 w-12 text-neutral-600 dark:text-neutral-400" />
                  </div>
                </div>
              }
              className="md:col-span-2"
              icon={<IconBolt className="h-4 w-4 text-neutral-500" />}
            />
            <BentoGridItem
              title="Secure by Default"
              description="Enterprise-grade security with end-to-end encryption and compliance standards."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconShield className="h-12 w-12 text-neutral-600 dark:text-neutral-400" />
                  </div>
                </div>
              }
              className="md:col-span-1"
              icon={<IconShield className="h-4 w-4 text-neutral-500" />}
            />
            <BentoGridItem
              title="Developer First"
              description="Built by developers, for developers. Intuitive APIs and comprehensive documentation."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconCode className="h-12 w-12 text-neutral-600 dark:text-neutral-400" />
                  </div>
                </div>
              }
              className="md:col-span-1"
              icon={<IconCode className="h-4 w-4 text-neutral-500" />}
            />
            <BentoGridItem
              title="Global Scale"
              description="Deploy worldwide with our global CDN and edge computing infrastructure for optimal performance."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconCloudComputing className="h-12 w-12 text-neutral-600 dark:text-neutral-400" />
                  </div>
                </div>
              }
              className="md:col-span-2"
              icon={<IconCloudComputing className="h-4 w-4 text-neutral-500" />}
            />
          </BentoGrid>
        </div>
      </div>

      {/* CRM Features Expandable Cards Section */}
      <div className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-4">
            Explore Our CRM Solutions
          </h2>
          <p className="text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
            Discover powerful CRM features designed to streamline your business operations and boost productivity.
          </p>
          <ExpandableCardDemo />
        </div>
      </div>

      {/* Team Section with Animated Tooltips */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-neutral-400 mb-16 max-w-2xl mx-auto">
            Passionate developers and designers working together to create amazing experiences.
          </p>
          <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={team} />
          </div>
        </div>
      </div>

      {/* Lamp Effect Section */}
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Build lamps <br /> the right way
        </motion.h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/sign-up">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-all duration-300"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </LampContainer>

      {/* Globe Section - Global Reach */}
      <GlobeDemo />

      {/* Meteors Section with Glowing Stars Card */}
      <div className="relative h-screen bg-black flex items-center justify-center overflow-hidden p-8">
        <Meteors number={20} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <GlowingStarsBackgroundCard className="group">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <div className="flex items-center gap-2 mb-4">
                <IconStar className="h-8 w-8 text-yellow-400" />
                <IconRocket className="h-8 w-8 text-blue-400" />
                <IconStar className="h-8 w-8 text-yellow-400" />
              </div>
              <GlowingStarsTitle className="text-4xl md:text-6xl font-bold mb-6">
                Shooting for the Stars
              </GlowingStarsTitle>
              <GlowingStarsDescription className="text-xl mb-8">
                Our mission is to help developers reach new heights with cutting-edge technology.
                Join us on this incredible journey to transform the way applications are built.
              </GlowingStarsDescription>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sign-up">
                  <Button
                    borderRadius="1.75rem"
                    className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                  >
                    Launch Your Project
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    borderRadius="1.75rem"
                    className="bg-transparent text-white border-white/20"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </GlowingStarsBackgroundCard>
        </div>
      </div>

      {/* Sparkles Section with Aurora Background */}
      <AuroraBackground>
        <div className="h-screen relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
          <div className="w-full absolute inset-0 h-screen">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full opacity-50"
              particleColor="#FFFFFF"
            />
          </div>
          <div className="relative z-20 text-center max-w-4xl mx-auto p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <IconSparkles className="h-10 w-10 text-purple-400 animate-pulse" />
              <IconSparkles className="h-8 w-8 text-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <IconSparkles className="h-12 w-12 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative mb-6"
            >
              Sparkle with Innovation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-300 text-center text-xl mb-8 max-w-2xl mx-auto"
            >
              Experience the magic of modern web development with our innovative platform.
              Transform your ideas into reality with cutting-edge technology.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/sign-up">
                <Button
                  borderRadius="1.75rem"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent"
                >
                  Start Innovating
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  borderRadius="1.75rem"
                  className="bg-transparent text-white border-white/30"
                >
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </AuroraBackground>

      {/* Animated Testimonials Section */}
      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-4">
            What People Say
          </h2>
          <p className="text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
            Hear from our satisfied customers who have transformed their businesses with our platform.
          </p>
          <AnimatedTestimonialsDemo />
        </div>
      </div>

      {/* CTA Section with Wavy Background */}
      <WavyBackground
        className="max-w-4xl mx-auto text-center px-4"
        colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
        waveWidth={50}
        backgroundFill="black"
        blur={10}
        speed="slow"
        waveOpacity={0.5}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <IconRocket className="h-10 w-10 text-blue-400 animate-bounce" />
            <IconSparkles className="h-8 w-8 text-purple-400 animate-pulse" />
            <IconRocket className="h-10 w-10 text-pink-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Ready to get started?
          </h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already building amazing applications with our platform.
            Transform your ideas into reality today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button
                borderRadius="2rem"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent hover:from-blue-600 hover:to-purple-700"
                containerClassName="w-64 h-16"
              >
                <span className="flex items-center gap-2">
                  <IconRocket className="h-5 w-5" />
                  Start Building Today
                </span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                borderRadius="2rem"
                className="bg-transparent text-white border-white/30 hover:bg-white/10"
                containerClassName="w-64 h-16"
              >
                <span className="flex items-center gap-2">
                  <IconMessage className="h-5 w-5" />
                  Contact Sales
                </span>
              </Button>
            </Link>
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm text-neutral-500 mb-4">Trusted by developers worldwide</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-2xl font-bold">99.9%</div>
            </div>
            <div className="flex items-center justify-center gap-8 text-xs text-neutral-400 mt-2">
              <div>Active Users</div>
              <div>Countries</div>
              <div>Uptime</div>
            </div>
          </div>
        </motion.div>
      </WavyBackground>
    </div>
  );
}