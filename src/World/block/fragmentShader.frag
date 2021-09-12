uniform vec3 uMouse;
uniform vec3 uColor;

in vec3 vPos;
in vec4 vWPos;
in vec3 vNormal;

void main()
{
    vec3 lightDirection=normalize(uMouse-vWPos.xyz);
    float diffusion=max(0.,dot(vNormal,lightDirection));
    gl_FragColor=vec4(uColor*diffusion,1.);
}