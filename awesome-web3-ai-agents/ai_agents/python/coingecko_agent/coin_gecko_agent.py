####
# IMPORTS
# 必要なライブラリのインポート
####

# Python Built In Libraries
from typing import Annotated  # used to set additional metadata for a variable

####
# UI - Streamlit I
####
import streamlit as st
from langchain_groq import ChatGroq
# Langchain / Langraph
from langgraph.graph import START, StateGraph
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition
# Local Imports
# toots.pyに定義されたツールをインポートする。
from tools import get_trending_tokens, search
from typing_extensions import \
    TypedDict  # a type that allows you to define dictionaries with specific key-value types

with st.sidebar:
    groq_api_key = st.text_input("Groq API Key", key="chatbot_api_key", type="password")
    "[Get an Groq API key](https://console.groq.com/keys)"
    "[![View the source code](https://badgen.net/static/Github/Repository/black?icon=github)](https://github.com/jondoescoding/awesome-ai-agents/tree/main/ai_agents/coingecko_agent)"


if groq_api_key:
    # Chatbotと生成
    llm = ChatGroq(model="llama3-70b-8192", api_key=groq_api_key)
else:
    st.warning(body="API key is not set. Please set the Groq API key.")
    st.stop()

####
# LOGIC - LANG-GRAPH
#  状態管理とグラフ構築
####
tools = [get_trending_tokens, search]
llm_with_tools = llm.bind_tools(tools=tools) # this is to make the LLM aware of the tools it has

class State(TypedDict):
    messages: Annotated[list, add_messages]
# AI agentの状態を管理するクラス
graph_builder = StateGraph(State) # the stategraph controls the structure of what our future chatbot will expect

# FUNCTIONS
def chatbot(state: State):
    # AIの推論を実行する。
    return {"messages": [llm_with_tools.invoke(state["messages"])]} # this takes the LAST message as input and returns an updated dict list under the messages within the State class

# NODES - Unit of work in the graph
# AI Agentのグラフを組み立てる。
tools_node = ToolNode(tools=[get_trending_tokens, search])
graph_builder.add_node(
    "chatbot", # name of the node
    chatbot # function which is called whenever the node is used within the graph
)
graph_builder.add_node("tools", tools_node)
graph_builder.add_conditional_edges(
    "chatbot",
    tools_condition,)
graph_builder.add_edge("tools", "chatbot")
graph_builder.add_edge(START, "chatbot") # START tells the graph where to start
#graph_builder.add_edge("chatbot", END) # END tells the graph where to end
graph = graph_builder.compile() # allows to graph to become runnable 


####
# UI - Streamlit II
# Streamlitで実装
####
st.title("🦎💬 CoinGecko Chatbot")

if "messages" not in st.session_state:
    st.session_state["messages"] = [{"role": "assistant", "content": "How can I help you?"}]

for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg["content"])

if prompt := st.chat_input():
    if not groq_api_key:
        st.info("Please add your Groq API key to continue.")
        st.stop()

    st.session_state.messages.append({"role": "user", "content": prompt})
    st.chat_message("user").write(prompt)
    response = graph.invoke({"messages": [("user", prompt)]})
    msg = response["messages"][-1].content # pulls ONLY the AI's response from the response dict
    st.session_state.messages.append({"role": "assistant", "content": msg})
    st.chat_message("assistant").write(msg)