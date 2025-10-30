

const Title = ({ text1,text2}) => {
  return (
    <div className={'inline-flex gap-2 items-center'}>
      <p className={'text-gray-950 text-2xl '}>{text1} <span className={'text-gray-800 text-2xl'}>{text2}</span> </p>
    </div>
  )
}

export default Title