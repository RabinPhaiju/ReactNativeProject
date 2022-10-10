import React, {useRef,useEffect,useState} from 'react';
import {Image, ScrollView, View, StyleSheet, Dimensions, AppState,Text, Button} from 'react-native';
import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';

// on canvas re-rendering after ghar click show fliker, slow re-render and and and 
// canvas context.isPointOnPath dont work, 
// the position where the canvas was pressed can be found out but, the function wont work (isPointOnPath)

const WIDTH = Dimensions.get('window').width*0.97;
const HEIGHT = WIDTH*0.8

const CanvasPage=({scale=1})=> {
  const [clickedGhar,setClickGhar] = useState(0)
  const canvasRef = useRef(null)
  let kundali_path2D = []
  let ctx = canvasRef?.current?.getContext('2d');

  const kundaliLines = (w, h) => {
    return [
      {move: [w/4, h/4], line1: [w/2, 0],line2:[w/4*3, h/4],line3:[w/2, h/2]},
      {move: [0, 0], line1: [w/2, 0],line2:[w/4,h/4]},
      {move: [0, h/2], line1: [0, 0],line2:[w/4, h/4]},
      {move: [0, h/2], line1: [w/4, h/4],line2:[w/2, h/2],line3:[w/4, h/4*3]},
      {move: [0, h], line1: [0, h/2],line2:[w/4, h/4*3]},
      {move: [w/2, h], line1: [0, h],line2:[w/4, h/4*3]},
      {move: [w/4, h/4*3], line1: [w/2, h/2],line2:[w/4*3, h/4*3],line3:[w/2, h]},
      {move: [w, h], line1: [w/2, h],line2:[w/2/2*3, h/4*3]},
      {move: [w, h/2], line1: [w, h],line2:[w/2/2*3, h/4*3]},
      {move: [w/2, h/2], line1: [w/4*3, h/4],line2:[w, h/2],line3:[w/4*3, h/4*3]},
      {move: [w, 0], line1: [w, h/2],line2:[w/4*3, h/4]},
      {move: [w/2, 0], line1: [w, 0],line2:[w/4*3, h/4]},
    ];
  }

  const drawKundaliLines = (ctx,kundali_path2D, color = 'black', lineWidth = 1) => { 
    let newKundali_path2D = kundali_path2D;

    newKundali_path2D.map((path, index) => {
    ctx.strokeStyle = color;
    if(index==clickedGhar){
      ctx.fillStyle = '#d4936960';
      ctx.fill(path);
    }
  
    ctx.lineWidth = lineWidth;
    ctx.stroke(path);
  })};

  const reDrawKundaliOnVariantChange = (canvasRef) => {
    kundali_path2D.map((path, index) => {kundali_path2D[index] = new Path2D(canvasRef.current);})
  }

  const handleClickEvent = (e) => {
    const x = Math.floor(e?.nativeEvent?.locationX)
    const y = Math.floor(e?.nativeEvent?.locationY)
    for (let i = 0;i <kundali_path2D.length;i++){
      if(ctx.isPointInPath(kundali_path2D[i],x,y)){
        // setClickGhar(i)
        // console.log("🚀 index", i)
        // break ;
    }
    }}

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    canvasRef.current.width = WIDTH;
    canvasRef.current.height = HEIGHT;
    ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.moveTo(0, 0);

    kundali_path2D = []
    // reDrawKundaliOnVariantChange(canvasRef);

    kundali_path2D = kundaliLines(WIDTH.toFixed(0), HEIGHT.toFixed(0)).map((line, index) => {
        let kundaliPathInit = new Path2D(canvasRef.current)
        kundaliPathInit.moveTo(line.move[0]*scale, line.move[1]*scale);
        kundaliPathInit.lineTo(line.line1[0]*scale, line.line1[1]*scale);
        kundaliPathInit.lineTo(line.line2[0]*scale, line.line2[1]*scale);
        line.hasOwnProperty('line3') && kundaliPathInit.lineTo(line.line3[0]*scale, line.line3[1]*scale);
        kundaliPathInit.lineTo(line.move[0]*scale, line.move[1]*scale);
        return kundaliPathInit
  })

    drawKundaliLines(ctx,kundali_path2D, color="black", lineWidth=1);
  },[clickedGhar])

    return (
      <View onTouchStart={handleClickEvent} style={{justifyContent: 'center', alignItems: 'center',marginTop:2}}>
            <Canvas ref={canvasRef} />
            <Text style={styles.text1}>Top</Text>
            <Text style={styles.text2}>Left</Text>
            <Text style={styles.text3}>Right</Text>
            <Text style={styles.text4}>Bottom</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  text1:{position:'absolute',top:HEIGHT/3/2},
  text2:{position:'absolute',top:HEIGHT/2,left:WIDTH-WIDTH/3*2},
  text3:{position:'absolute',top:HEIGHT/2,left:WIDTH/3*2},
  text4:{position:'absolute',top:HEIGHT/3*2}
})

export default CanvasPage