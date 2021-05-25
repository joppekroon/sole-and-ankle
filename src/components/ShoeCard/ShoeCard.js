import React, { Children } from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  imageSrc,
  salePrice,
  releaseDate,
  ...delegated
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const Details = typeof salePrice === 'number'
    ? SaleDetails
    : isNewShoe(releaseDate)
      ? NewReleaseDetails
      : DefaultDetails
  ;
      
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Details {...delegated} salePrice={salePrice} />
      </Wrapper>
    </Link>
  );
};

const DefaultDetails = ({
  name,
  price,
  numOfColors
}) => {
  return (
    <>
      <Row>
        <Name>{name}</Name>
        <Price>{formatPrice(price)}</Price>
      </Row>
      <Row>
        <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
      </Row>
    </>
  );
};

const SaleDetails = ({
  name,
  price,
  numOfColors,
  salePrice,
}) => {
  return (
    <>
      <Flag style={{ '--flag-color': COLORS.primary }}>Sale</Flag>
      <Row>
        <Name>{name}</Name>
        <Price><del>{formatPrice(price)}</del></Price>
      </Row>
      <Row>
        <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        <SalePrice>{formatPrice(salePrice)}</SalePrice>
      </Row>
    </>
  );
};

const NewReleaseDetails = ({
  name,
  price,
  numOfColors,
}) => {
  
  return (
    <>
      <Flag style={{ '--flag-color': COLORS.secondary }}>Just Released!</Flag>
      <Row>
        <Name>{name}</Name>
        <Price>{formatPrice(price)}</Price>
      </Row>
      <Row>
        <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
      </Row>
    </>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 10px;
  
  margin-top: 12px;
  margin-right: -4px;
  
  background-color: var(--flag-color);
  color: ${COLORS.white};
  
  border-radius: 2px;
`;

export default ShoeCard;
