#include <bits/stdc++.h>
using namespace std;
#define ll int

int main()
{
    ll T;
    cin >> T;
    for(ll t=1;t<=T;t++)
    {
        ll r,c;
        cin >> r >> c;
        vector<vector<ll> > mat(r,vector<ll> (c));
        ll mx=0;
        for(ll i=0;i<r;i++)
        {
            for(ll j=0;j<c;j++)
            {
                cin >> mat[i][j];
                mx=max(mx,mat[i][j]);
            }
        }
        vector<vector<bool> > visited(r,vector<bool> (c,false));
        queue<pair<ll,ll> > q;
        for(ll i=0;i<r;i++)
        {
            for(ll j=0;j<c;j++)
            {
                if(mat[i][j]==mx)
                {
                    q.push({i,j});
                }
            }
        }
        ll ans=0;
        while(!q.empty())
        {
            pair<ll,ll> p=q.front();
            q.pop();
            if(p.first<0||p.first>=r||p.second<0||p.second>=c)
            {
                continue;
            }
            /*if(visited[p.first][p.second])
            {
                if(abs(mat[p.first][p.second]-mat[p.first-1][p.second])<=1)
            }*/
            visited[p.first][p.second]=true;
            if(p.first>0)
            {
                if(mat[p.first][p.second]-mat[p.first-1][p.second]>1)
                {
                    ans+=mat[p.first][p.second]-mat[p.first-1][p.second]-1;
                    mat[p.first-1][p.second]=mat[p.first][p.second]-1;
                    q.push({p.first-1,p.second});
                    visited[p.first-1][p.second]=true;
                }
                else if(mat[p.first][p.second]-mat[p.first-1][p.second]<-1||!visited[p.first-1][p.second])
                {
                    q.push({p.first-1,p.second});
                    visited[p.first-1][p.second]=true;
                }
            }
            if(p.first<r-1)
            {
                if(mat[p.first][p.second]-mat[p.first+1][p.second]>1)
                {
                    ans+=mat[p.first][p.second]-mat[p.first+1][p.second]-1;
                    mat[p.first+1][p.second]=mat[p.first][p.second]-1;
                    q.push({p.first+1,p.second});
                    visited[p.first+1][p.second]=true;
                }
                else if(mat[p.first][p.second]-mat[p.first+1][p.second]<-1||!visited[p.first+1][p.second])
                {
                    q.push({p.first+1,p.second});
                    visited[p.first+1][p.second]=true;
                }
            }
            if(p.second>0)
            {
                if(mat[p.first][p.second]-mat[p.first][p.second-1]>1)
                {
                    ans+=mat[p.first][p.second]-mat[p.first][p.second-1]-1;
                    mat[p.first][p.second-1]=mat[p.first][p.second]-1;
                    q.push({p.first,p.second-1});
                    visited[p.first][p.second-1]=true;
                }
                else if(mat[p.first][p.second]-mat[p.first][p.second-1]<-1||!visited[p.first][p.second-1])
                {
                    q.push({p.first,p.second-1});
                    visited[p.first][p.second-1]=true;
                }
            }
            if(p.second<c-1)
            {
                if(mat[p.first][p.second]-mat[p.first][p.second+1]>1)
                {
                    ans+=mat[p.first][p.second]-mat[p.first][p.second+1]-1;
                    mat[p.first][p.second+1]=mat[p.first][p.second]-1;
                    q.push({p.first,p.second+1});
                    visited[p.first][p.second+1]=true;
                }
                else if(mat[p.first][p.second]-mat[p.first][p.second+1]<-1||!visited[p.first][p.second+1])
                {
                    q.push({p.first,p.second+1});
                    visited[p.first][p.second+1]=true;
                }
            }
        }
        //vector<vector<bool> > visited(r,vector<bool> (c,false));
        cout << "Case #" << t << ": " << ans << endl;
    }
    return 0;
}