import { MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons'
import { connect } from "react-redux";
import { updateCollapse } from "@/store/modules/global/action";

const CollapseIcon=(props: any)=>{
const {isCollapse, updateCollapse}= props

  return(
   <div
			className="collapsed"
			onClick={() => {
				updateCollapse(!isCollapse);
			}}
		>
			{isCollapse ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
		</div>
  )
}

//export default CollapseIcon

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(CollapseIcon);