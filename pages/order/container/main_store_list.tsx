import { Badge, ListView, Tabs, WhiteSpace } from 'antd-mobile';
import React, { useEffect, useRef, useState } from 'react';
import MainStoreModal from '../component/MainStoreModal';

const tabs = [
    { title: <Badge text={''}>주변매장</Badge> },
    { title: <Badge text={''}>MY매장</Badge> },
];

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: '을지로점',
        des: '서울특별시 중구 을지로 21-1번지',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: '명동점',
        des: '서울특별시 중구 명동리 1번지',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: '강남점',
        des: '서울특별시 강남구 역삼로 2번지',
    },
];
const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 3;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];

function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const MyList = () => (
    <>
        <h1>My매장</h1>
    </>
)

const NearList = (props) => {

    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    const datasource = new ListView.DataSource({
        getRowData,
        getSectionHeaderData: getSectionData,
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    const [dataSource, setDataSource] = useState(datasource);
    const [isLoading, setIsLoading] = useState(true);
    const [height, setHeight] = useState(0);

    const listRef = useRef();
    const genData = (pIndex = 0) => {
        for (let i = 0; i < NUM_SECTIONS; i++) {
            const ii = (pIndex * NUM_SECTIONS) + i;
            const sectionName = `Section ${ii}`;
            sectionIDs.push(sectionName);
            dataBlobs[sectionName] = sectionName;
            rowIDs[ii] = [];

            for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
                const rowName = `S${ii}, R${jj}`;
                rowIDs[ii].push(rowName);
                dataBlobs[rowName] = rowName;
            }
        }
        sectionIDs = [...sectionIDs];
        rowIDs = [...rowIDs];
    }

    useEffect(() => {
        let timer1 = setTimeout(() => {
            genData();
            console.log("rowIDs => ", rowIDs);
            setDataSource(dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs));
            setIsLoading(false);
            setHeight(document.documentElement.clientHeight);
        }, 600);
        return () => {
            clearTimeout(timer1);
        };
    }, []); // data가 바뀔때만 effect를 재실행 합니다. 

    const onEndReached = (event) => {
        if (isLoading) {
            return;
        }
        console.log('reach end', event);
        setIsLoading(true);
        setTimeout(() => {
            genData(++pageIndex);
            console.log(dataBlobs, sectionIDs, rowIDs);
            setDataSource(dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs));
            setIsLoading(false);
        }, 1000);
    }

    const separator = (sectionID, rowID) => (
        <div
            key={`${sectionID}-${rowID}`}
            style={{
                backgroundColor: '#F5F5F9',
                height: 8,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
            }}
        />
    );

    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
        if (index < 0) {
            index = data.length - 1;
        }
        const obj = data[index--];
        return (
            <div key={rowID} style={{ padding: '0 15px' }}>
                <div
                    style={{
                        lineHeight: '50px',
                        color: '#888',
                        fontSize: 18,
                        borderBottom: '1px solid #F6F6F6',
                    }}
                ><MainStoreModal title={obj.title}>{obj.title}</MainStoreModal></div>
                <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                    <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                    <div style={{ lineHeight: 1 }}>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                        <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <ListView
                ref={listRef}
                dataSource={dataSource} // 사용할 ListView.DataSource 의 인스턴스 
                renderHeader={() => <span>전체 매장수: {data.length}</span>} // 헤더 항상 표시 
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {isLoading ? 'Loading...' : 'Loaded'}
                </div>)} // 푸터 항상 표시 
                renderSectionHeader={sectionData => ( // 세션에 대한 헤더가 렌더링 
                    <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                )}
                renderBodyComponent={() => <MyBody />} // listView 본문 래퍼 구성 요소 렌더링 
                renderRow={row} // 데이터 소스 및 해당 ID에서 데이터 항목을 가져오고 행으로 렌더링 할 렌더링 가능한 구성 요소를 반환해야 한다. HighlightRow 함수를 호출하여 행이 강조 표시 될때 ListView에 알릴 수 있다. 
                renderSeparator={separator} // 각 행 아래의 구분 기호로 렌더링 되지만, 아래에 세션 헤더가 있는 경우 마지막 행은 렌더링 되지 않음.
                style={{
                    height: height,
                    overflow: 'auto',
                }}
                pageSize={4} // 이벤트 루프 당 렌더링 할 행 수
                onScroll={() => { console.log('scroll'); }} // 스크롤하는 동안 프레임 당 한 번만 실행
                scrollRenderAheadDistance={500} // 행이 화면에 표시되기 전에 렌더링을 시작하는 시간(픽셀단위)
                onEndReached={onEndReached} // 모든행이 실행되고 맨아래 스크롤이 되었을때 호출 
                onEndReachedThreshold={10} // 호출에 대한 임계 값 
            />
        </>
    )
}

const TabExample = () => (
    <div>
        <Tabs tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => {
                console.log('onChange', index, tab);
            }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
            <NearList />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                <MyList />
            </div>
        </Tabs>
        <WhiteSpace />
    </div>
);

interface Props {
}

export const MainStoreList = (props: Props) => {

    return (
        <>
            <TabExample />
        </>
    )
}
export default MainStoreList;
