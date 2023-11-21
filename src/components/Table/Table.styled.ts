import styled from "@emotion/styled";

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  opacity: 1;
  background-color: inherit;
  border: none;
  text-align: end;

  &:not(:disabled) {
    border: 1px solid gray;
  }
`;

export const StyledBtn = styled.button`
  width: 20px;
  position: absolute;
  top: 2px;
  right: 3px;
  padding: 0;
  background-color: inherit;
  color: gray;
  border: none;
  border-radius: 5px;

  & > svg {
    pointer-events: none;
  }
`;

export const StyledBtnSet = styled.button`
  width: 20px;
  position: absolute;
  top: 2px;
  right: 19px;
  padding: 0;
  background-color: inherit;
  color: gray;
  border: none;
  border-radius: 5px;
`;

export const StyledDiv = styled.div`
  text-align: end;
  width: 100px;
  position: absolute;
  top: 16px;
  right: 16px;
`;
