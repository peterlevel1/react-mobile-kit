import classNames from 'classnames';
import { Layer, Button } from '@react-mobile-kit/h5';
import { DemoBlock } from 'demos';
import './index.less';

function ModalElement({ status }) {
  const cls = classNames('demo-Layer-modal', status);

  return (
    <div className={cls}>
    </div>
  );
}

export default () => {
  const [ active, setActive ] = React.useState(false);

  const hideModal = React.useCallback(() => {
    setActive(false);
  }, []);

  const showModal = React.useCallback(() => {
    setActive(true);
  }, []);

  return (
    <>
      <DemoBlock title='基础用法'>
        <Button block onClick={showModal}>
          点击
        </Button>
        <Layer active={active} onClose={hideModal} maskProps={{ theme: 'dark', closable: true }}>
          <ModalElement />
        </Layer>
      </DemoBlock>
    </>
  );
}
