import { type NextRequest, NextResponse } from "next/server";

 // Dummy Client Info or Fetch from BE...
 const clientList = [
  {
    host: "localhost",
    key: "RERQY2hhdGJvdDIwMjQ"
  }
]

interface Payload {
  host:string;
  key:string;
}

export async function POST(request:NextRequest) {

  const data:Payload = await request.json();
  // console.log('request data', data)
  const {host, key} = data;

  if(!host || !key) {
    return NextResponse.json({ message: 'Missing host or apiKey' }, { status: 400 });
  }

  const hostWithoutProtocol = host.replace(/(^\w+:|^)\/\//, '');
  const clientUrl = hostWithoutProtocol.split('/').length > 0 ? hostWithoutProtocol.split('/')[0] : hostWithoutProtocol;

  const isExist = clientList.filter(item => item.host === clientUrl && item.key === key)

  if(isExist.length > 0) {
    return NextResponse.json({ message: "Hello DDP Chatbot" }, { status: 200 });
  }

  return NextResponse.json({ message: "Not Found Chatbot Client" }, { status: 404 });
}