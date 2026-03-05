"use client";

import { motion } from "framer-motion";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";
import { SectionHeader } from "@/components/SectionHeader";

export const ContactSection = () => {
  return (
    <section
      id="contacts"
      className="relative scroll-mt-[100px] py-16 sm:py-20 lg:py-32 overflow-x-clip"
    >
      {/* Ambient Background Glow
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] sm:h-[400px] w-[600px] sm:w-[900px] bg-emerald-400/10 blur-3xl rounded-full pointer-events-none -z-10" /> */}

      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Your connection matters"
          description="Feel free to reach out for collaborations, inquiries, or just to say hello! I'm always here to chat."
        />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 sm:mt-16 lg:mt-20"
        >
          {/* Animated Gradient Border Wrapper */}
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-400 bg-[length:200%_200%] animate-gradient">

            {/* Inner Card */}
            <div className="relative rounded-3xl bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14 overflow-hidden">

              {/* Grain Texture */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: `url(${grainImage.src})` }}
              />

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500/60" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">

              {/* TEXT SIDE */}
              <div className="max-w-2xl xl:max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                  Let&apos;s create something amazing together
                </h2>

                <p className="mt-5 text-sm sm:text-base lg:text-lg xl:text-xl text-gray-800/80 leading-relaxed max-w-xl lg:max-w-none mx-auto lg:mx-0">
                  Ready to bring your next project to life? Let&apos;s connect and discuss how I
                  can help you achieve your goals.
                </p>
              </div>

              {/* CTA SIDE */}
              <div className="flex justify-center lg:justify-end lg:min-w-[220px]">
                <motion.a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=iamchesterandaya@gmail.com&su=Project%20Inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="relative group inline-flex items-center justify-center gap-2
                  h-14 px-10 rounded-xl font-semibold text-lg
                  bg-gray-900 text-emerald-300 border border-emerald-400/50
                  shadow-[0_0_25px_rgba(16,185,129,0.25)]
                  hover:shadow-[0_0_50px_rgba(16,185,129,0.6)]
                  hover:bg-black
                  transition-all duration-300"
                >
                  {/* Hover Glow */}
                  <span className="absolute -inset-3 rounded-xl bg-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

                  {/* Pulse Ring */}
                  <span className="absolute -inset-1 rounded-xl border border-emerald-400/40 animate-pulse-slow pointer-events-none" />

                  <span className="relative z-10 flex items-center gap-2">
                    Contact Me
                    <ArrowUpRightIcon className="size-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </motion.a>
              </div>

            </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4,0,0.6,1) infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
};