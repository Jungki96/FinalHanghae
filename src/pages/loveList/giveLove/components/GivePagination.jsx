import styled from "styled-components";

const GivePagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);

  return (
    <Nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        {/* &lt; => 왼쪽꺽새를 의미합니다 */}
        &lt;
      </Button>
      {/* 페이지네이션 쪽수 보여주게 하는것 */}
      {/* {Array(numPages)
        .fill()
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </Button>
        ))} */}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        {/* &gt; => 오른쪽꺽새를 의미합니다 */}
        &gt;
      </Button>
    </Nav>
  );
};
export default GivePagination;

const Nav = styled.nav`
  width: 80vw;
  display: flex;
  justify-content: space-between;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7vh;
  width: 5vw;
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
