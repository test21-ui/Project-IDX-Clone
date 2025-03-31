import { Button, Layout } from "antd";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject"

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
    border: '2px solid black',
  };

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 120,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: 'orange',
  };
  
const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'white',
  };

  const footerStyle = {
    height: 120,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'green',
  };  
export const CreateProject = () => {

    const { Header, Footer, Content } = Layout;

    const {createProject,isPending} = useCreateProject();

    async function handleCreateProject(){
        console.log('Creating project...')
        try{
            await createProject();
            console.log('Project created! Now we should redirect to editor');
        } catch(error){
            console.error('Error creating project:', error)
            alert('Error creating project. Please try again later.')  // Replace with your preferred error handling method.
        }
    }

    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <h1>Create Project</h1>
            </Header>
            <Content style={contentStyle}>
                <Button type="primary" onClick={handleCreateProject} disabled={isPending}>
                    {isPending? 'Creating...' : 'Create Project'}
                </Button>
            </Content>
            <Footer style={footerStyle}>
                <p>Created by Sankalp</p>
            </Footer>
        </Layout>
    )
}