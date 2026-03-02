import React from 'react';
import { motion } from 'framer-motion';

export const revealVariants = {
    fadeUp: {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    },
    slideRight: {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            }
        }
    }
};

const ScrollReveal = ({
    children,
    className = '',
    animation = 'fadeUp',
    variants,
    threshold = 0.1,
    once = true,
    delay = 0,
    ...props
}) => {
    const selectedVariants = variants || revealVariants[animation] || revealVariants.fadeUp;

    const applyDelay = (v) => {
        if (delay > 0 && v.visible?.transition) {
            return {
                ...v,
                visible: {
                    ...v.visible,
                    transition: {
                        ...v.visible.transition,
                        delay: delay,
                    },
                },
            };
        }
        return v;
    };

    return (
        <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once, amount: threshold }}
            variants={applyDelay(selectedVariants)}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
