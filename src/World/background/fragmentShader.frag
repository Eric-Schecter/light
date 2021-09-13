uniform vec3 uMouse;
uniform vec3 uColor;

in vec3 vPos;
in vec3 vWPos;
in vec3 vNormal;

float getScatter(vec3 cameraPos,vec3 dir,vec3 lightPos,float d){
    vec3 q=cameraPos-lightPos;
    float b=dot(dir,q);
    float c=dot(q,q);
    float t=c-b*b;
    float s=1./sqrt(max(.0001,t));
    float l=s*(atan((d+b)*s))-atan(b*s);
    return pow(max(0.,l/150.),.4);
}

void main()
{
    vec3 cameraToWorld=vWPos-cameraPosition;
    vec3 cameraToWorldDir=normalize(cameraToWorld);
    float cameraToWorldDistance=length(vPos-cameraPosition);
    float scatter=getScatter(cameraPosition,cameraToWorldDir,uMouse,cameraToWorldDistance);
    float d=length(vPos)/30.;
    float alpha=max(scatter,d);
    gl_FragColor=vec4(uColor*alpha,1.);
}