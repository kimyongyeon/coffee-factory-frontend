import React, { useState } from 'react'
import { Modal, List, Button, WhiteSpace, WingBlank, Icon } from 'antd-mobile';

const closest = (el, selector) => {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

interface Props {
    title: String;
}

const MainStoreModal = (props: Props) => {

    const [modal1, setModal1] = useState(false);

    const showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        setModal1(true);
    }

    const onClose = key => () => {
        setModal1(false);
    }

    const onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    return (
        <WingBlank>
            <h2 onClick={showModal('modal1')}>{props.title}</h2>
            <WhiteSpace />
            <Modal
                visible={modal1}
                transparent
                maskClosable={false}
                onClose={onClose('modal1')}
                title="주문 매장 선택"
                footer={[{ text: '해당 매장에서 주문합니다.', onPress: () => { console.log('ok'); onClose('modal1')(); } }]}
                wrapProps={{ onTouchStart: onWrapTouchStart }}
                // afterClose={() => { console.log('afterClose'); }}
            >
                <div style={{ height: 200, overflow: 'auto' }}>
                    <img src="https://t1.daumcdn.net/cfile/tistory/2636C73D568B80CF2F" alt="매장사진" width="100%" height="auto" />
                </div>
                <div style={{ textAlign: "left", lineHeight: "0.5" }}>
                    <h3>상도역점</h3>
                    <p>서울특별시 동작구 양녕로 272</p>
                    <p>02-6053-4019</p>
                </div>
            </Modal>
        </WingBlank>
    )
}

export default MainStoreModal

