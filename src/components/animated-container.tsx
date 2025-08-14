'use client'

import { motion } from 'framer-motion'

interface AnimatedContainerProps {
    children: React.ReactNode
    delay?: number
    className?: string
    direction?: 'up' | 'down' | 'left' | 'right'
    staggerChildren?: number
}

const directionVariants = {
    up: { y: 30, opacity: 0 },
    down: { y: -30, opacity: 0 },
    left: { x: 30, opacity: 0 },
    right: { x: -30, opacity: 0 }
}

export function AnimatedContainer({
    children,
    delay = 0,
    className = '',
    direction = 'up',
    staggerChildren = 0.1
}: AnimatedContainerProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: staggerChildren
            }
        }
    }

    const itemVariants = {
        hidden: directionVariants[direction],
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    }

    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {Array.isArray(children) ? (
                children.map((child, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        {child}
                    </motion.div>
                ))
            ) : (
                <motion.div variants={itemVariants}>
                    {children}
                </motion.div>
            )}
        </motion.div>
    )
}