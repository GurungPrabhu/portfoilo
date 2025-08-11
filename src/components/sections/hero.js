import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { SplineSection } from '..';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--alternate-color);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, I am</h1>;
  const two = (
    <h2 className="big-heading" style={{ fontSize: '3rem' }}>
      Prabhu Gurung
    </h2>
  );
  const three = (
    <>
      <div style={{ display: 'inline-block', marginRight: '10px' }}>
        <h3 className="big-heading" style={{ fontSize: '1.75rem' }}>
          Full Stack
        </h3>
        <h3 className="big-heading" style={{ fontSize: '2rem', textAlign: 'right' }}>
          AI | Web
        </h3>
      </div>
      <h3 className="big-heading" style={{ display: 'inline-block' }}>
        Developer
      </h3>
    </>
  );
  const four = (
    <>
      <p style={{ marginTop: '0' }}>
        Passionate Full Stack Web & AI Developer, I bring a depth of expertise shaped by years of
        building innovative, scalable solutions that blend technical precision with user-focused
        design. I excel in developing robust applications, RESTful APIs, and seamless UI/UX, while
        integrating AI to solve complex, real-world challenges. Driven by passion and curiosity, I
        continuously explore emerging technologies to deliver high-quality, impactful digital
        experiences.
      </p>
    </>
  );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      <SplineSection />
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
