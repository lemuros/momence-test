import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Container } from "../components/layout/Container";
import { Flex } from "../components/ui/Flex";
import { H1 } from "../components/ui/Text";

export const ErrorFallback = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <ErrorWrapper alignItems="center" justifyContent="center" gap={32}>
        <ErrorImage alt="" src="./facepalm.jpg" />
        <Flex gap={16} alignItems="center">
          <H1>{t("error.title")}</H1>
          <ErrorText>{t("error.description")}</ErrorText>
        </Flex>
      </ErrorWrapper>
    </Container>
  );
};

const ErrorWrapper = styled(Flex)`
  height: 100vh;
`;

const ErrorImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  filter: grayscale(0.8);
`;

const ErrorText = styled.p`
  margin: 0;
  text-align: center;
  line-height: 1.8rem;
`;
